export async function onRequest(context) {
  const request = context.request;
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();

  // 1. Check karein agar request Facebook, Twitter, ya kisi crawler se aa rahi hai
  const isSocialCrawler = userAgent.includes("facebookexternalhit") || 
                          userAgent.includes("facebot") || 
                          userAgent.includes("twitterbot") || 
                          userAgent.includes("linkedinbot");

  // Agar crawler hai, toh use REDIRECT MAT KAREIN, seedha index.html load hone dein
  if (isSocialCrawler) {
    return context.next();
  }

  // 2. Normal users ke liye mobile/desktop detection
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isMobileDevice = isMobile || context.request.cf?.deviceType === "mobile";
  }

  // 3. Desktop users ke liye redirect
  return Response.redirect("https://google.com", 302);
}
