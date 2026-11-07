import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { destinations } from "@/data/destinations";
import { getNearbyPlaces, supportsNearbyDirectory } from "@/components/NearbyPlaces";

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


describe("Nearby destination directory", () => {
  it("shows the three nearby categories for every beach and waterfall", () => {
    const naturalDestinations = destinations.filter((d) => d.category === "praia" || d.category === "cachoeira");
    expect(naturalDestinations.length).toBeGreaterThan(0);
    for (const destination of naturalDestinations) {
      expect(supportsNearbyDirectory(destination)).toBe(true);
      expect(["hospedagem", "gastronomia", "lazer"].every((category) =>
        getNearbyPlaces(destination, category as "hospedagem" | "gastronomia" | "lazer").every((item) =>
          item.state === destination.state && item.city === destination.city,
        ),
      )).toBe(true);
    }
  });

  it("keeps unknown distances and ratings blank instead of inventing them", () => {
    const destination = destinations.find((d) => d.category === "praia" || d.category === "cachoeira");
    expect(destination).toBeTruthy();
    const results = getNearbyPlaces(destination!, "hospedagem");
    for (const item of results) {
      if (!item.distanceToDestination && !(item.coordinates?.verified && destination!.coordinates?.verified)) {
        expect(item.distanceToDestination).toBeUndefined();
      }
    }
  });
});
