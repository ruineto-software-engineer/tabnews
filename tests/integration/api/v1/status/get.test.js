test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const updated_at = responseBody.updated_at;
  const parsedUpdatedAt = new Date(updated_at).toISOString();
  expect(updated_at).toBeDefined();
  expect(parsedUpdatedAt).toBe(updated_at);

  const databaseVersion = responseBody.dependencies.database.version;
  expect(databaseVersion).toBeDefined();
  expect(databaseVersion).toBe("16.0");

  const databaseMaxConnections =
    responseBody.dependencies.database.max_connections;
  expect(databaseMaxConnections).toBeDefined();
  expect(databaseMaxConnections).toBe(100);

  const databaseOpenedConnections =
    responseBody.dependencies.database.opened_connections;
  expect(databaseOpenedConnections).toBeDefined();
  expect(databaseOpenedConnections).toBe(1);
});
