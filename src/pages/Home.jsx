function Home() {
  return (
    <>
      <section className="bg-gradient-to-r from-secondary to-accent text-white py-20 text-center">
        <h1 className="text-5xl font-heading mb-4">
          Welcome to Rock of Ages, Frank
        </h1>
        <p className="text-lg max-w-xl mx-auto">
          Collect, browse, and manage your favorite rocks from around the world.
        </p>
      </section>
      <main className="max-w-4xl mx-auto py-10 px-4">
        {/* Additional home content could go here */}
      </main>
    </>
  );
}

export default Home;
