export const authConfig = {
    providers: [], // Configure your authentication providers here
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized({ auth, request }) {
        const isLoggedIn = !!auth?.user; // Use double negation for a more concise check
        const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  
        if (isOnDashboard) {
          if(isLoggedIn) return true;
          return false; // Allow access only if logged in
        } else if(isLoggedIn){
        return Response.redirect(new URL("/dashboard", request.nextUrl)); // Redirect to dashboard if logged in, otherwise allow access
        }
      },
    },
  };
  