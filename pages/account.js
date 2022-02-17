import React from "react";
import { parseCookies } from "nookies";

const Account = () => {
  return (
    <div>
      <h1>Great u logged in!</h1>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }

  return {
    props: {},
  };
}

export default Account;
