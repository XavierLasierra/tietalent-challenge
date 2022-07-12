import React from "react";

import { useRouter } from "next/router";

const Planet = () => {
  const router = useRouter();
  const { planetId } = router.query;

  return <p>{planetId}</p>;
};

export default Planet;
