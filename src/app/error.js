"use client";
import React from "react";

export default function error({ error }) {
  console.log(error);

  return (
    <div className="h-full w-full self-center">
      An error has occors please contact your support
    </div>
  );
}
