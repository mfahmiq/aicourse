import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Clerk webhook instance with your secret
  const wh = new WebhookEvent(body, {
    svixId: svix_id,
    svixTimestamp: svix_timestamp,
    svixSignature: svix_signature,
    webhookSecret: process.env.CLERK_SECRET_KEY || "",
  });

  // Verify the webhook
  let evt: WebhookEvent;
  try {
    evt = wh;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  // Handle user creation
  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    const primaryEmail = email_addresses[0]?.email_address;

    // Insert the user into Supabase
    const { error } = await supabase.from("users").insert({
      id: id,
      email: primaryEmail,
      first_name: first_name,
      last_name: last_name,
      avatar_url: image_url,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error inserting user into Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "User created successfully" });
  }

  // Handle user update
  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    const primaryEmail = email_addresses[0]?.email_address;

    // Update the user in Supabase
    const { error } = await supabase
      .from("users")
      .update({
        email: primaryEmail,
        first_name: first_name,
        last_name: last_name,
        avatar_url: image_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating user in Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "User updated successfully" });
  }

  // Handle user deletion
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    // Delete the user from Supabase
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      console.error("Error deleting user from Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  }

  return NextResponse.json({ message: "Webhook received" });
}