import { supabase } from "../lib/supabase";

export async function onRequest({ cookies, locals }, next) {
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  console.log("Middleware-accessToken:", accessToken);
  console.log("Middleware-refreshToken:", refreshToken);

  let user = null;

  if (accessToken && refreshToken) {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error al obtener la sesión:", error.message);
      } else if (data?.session) {
        user = data.session.user;
      }
    } catch (error) {
      console.error("Error inesperado:", error);
    }
  }

  if (!user && refreshToken) {
    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });
      if (error) {
        console.error("Error al refrescar la sesión:", error.message);
      } else if (data?.user) {
        user = data.user;
        console.log("Middleware-user:", user);
      }
    } catch (error) {
      console.error("Error inesperado al refrescar la sesión:", error);
    }
  }

  locals.user = user;

  const title = "Astro Supabase Middleware";
  
  locals.title = title;
  return next();
}
