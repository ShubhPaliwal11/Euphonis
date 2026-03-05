import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
const isPublicRoute = createRouteMatcher(["/sign-in(.*)","/sign-up(.*)"]);
const isOrgSelectionRoute = createRouteMatcher("/org-selection(.*)");

export default clerkMiddleware(async (auth, req) => {
    const {userId , orgId} = await auth();
    
    // this line checks whether the user is authenticated or not,
    //  if not and the route is not public, it will redirect to sign in page
    if(isPublicRoute(req)){
        return NextResponse.next();
    }

    // protect all routes except the ones that are public and the org selection page
    if(!userId){
        await auth.protect();
    }

    // this line checks whether the user has an org selected or not,
    //  if not and the route is not the org selection page, it will redirect to org selection page 
    if(isOrgSelectionRoute(req)){
        return NextResponse.next();
    }
    
    // if the user is authenticated but doesn't have an org selected, 
    // redirect to org selection page
    if (userId && !orgId) {
    return NextResponse.redirect(new URL("/org-selection", req.url));
  }

});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};