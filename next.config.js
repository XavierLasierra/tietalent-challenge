module.exports = {
  async redirects() {
    return [
      {
        source: "/planets",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
