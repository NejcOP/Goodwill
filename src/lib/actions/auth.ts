"use server";

import { supabase } from "@/lib/supabase";
import type { AuthResponse } from "@supabase/supabase-js";

export async function signUp(email: string, password: string, fullName: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) return { error: error.message };

    return { data, success: true };
  } catch (error) {
    return { error: "Greška pri registraciji" };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error: error.message };

    return { data, success: true };
  } catch (error) {
    return { error: "Greška pri prijavi" };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { error: error.message };
    return { success: true };
  } catch (error) {
    return { error: "Greška pri odjavi" };
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    return null;
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/racun/ponastavi-geslo`,
    });

    if (error) return { error: error.message };
    return { success: true };
  } catch (error) {
    return { error: "Greška pri pošiljanju emaila" };
  }
}
