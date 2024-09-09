"use server";
import { cookiesExpires, cookiesKey } from "@/config";
import { cookies } from "next/headers";

const calcExpiresDay = (days) => {
  const oneDay = days * (24 * 60 * 60 * 1000);
  const expirationDate = Date.now() - oneDay;
  return expirationDate;
};

export const onChangeSetting = (settings) => {
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set(
    cookiesKey.themeMode,
    settings.themeMode
    // { expires: Date.now() - oneDay }
    //{ maxAge: cookiesExpires * 86400,
    //
    // { expires: calcExpiresDay(cookiesExpires) }
  );

  cookies().set(
    cookiesKey.themeLayout,
    settings.themeLayout
    // { expires: Date.now() - oneDay }
    // {maxAge: cookiesExpires * 86400,
    // expires: Date.now() - oneDay, }
  );
};
