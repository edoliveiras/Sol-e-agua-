import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { destinations } from "@/data/destinations";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
describe("Destination catalog integrity", () => {
  it("has unique IDs, valid categories and image URLs", () => {
    const ids = destinations.map((destination) => destination.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const destination of destinations) {
      expect(["praia", "cachoeira", "hotel", "day-use", "pousada", "cultural", "passeio", "gastronomia", "evento"]).toContain(destination.category);
      expect(destination.images.length).toBeGreaterThan(0);
      expect(() => new URL(destination.images[0])).not.toThrow();
    }
  });

  it("provides source and license for every credited photograph", () => {
    for (const destination of destinations) {
      if (destination.photoCredit) {
        expect(destination.photoSourceUrl).toBeTruthy();
        expect(destination.photoLicenseUrl).toBeTruthy();
      }
    }
  });
});
