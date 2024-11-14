const socketCookies = (cookie) => {
  if (!cookie) return null;

  let cookies = {};

  //   const cookie = "_at=ksdjfdklcasdkd=sa; _cta=asdnklfdasfdjncjdkscds";

  const cookieArray = cookie.split("; ");

  if (!cookieArray) {
    const equalSignIndex = cookie.indexOf("=");

    const key = cookie.slice(0, equalSignIndex);
    const value = cookie.slice(equalSignIndex + 1);

    cookies[key] = value;
  } else {
    cookieArray.forEach((cookie) => {
      const equalSignIndex = cookie.indexOf("=");

      if (equalSignIndex == -1) return cookie;

      const key = cookie.slice(0, equalSignIndex);
      const value = cookie.slice(equalSignIndex + 1);

      cookies[key] = value;
    });
  }

  return cookies;
};

export default socketCookies;
