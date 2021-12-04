import { expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useBreedList from "../useBreedList";

/**
 * This is an alternative to renderHoook from @testing-library/react-hooks
 * @param {*} animal
 * @returns
 */
function getBreedList(animal) {
  let list;
  function TestComponent() {
    list = useBreedList(animal);
    return null;
  }

  render(<TestComponent />);

  return list;
}

test("gives an empty array with no animal", async () => {
  const { result } = renderHook(() => useBreedList());
  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("unloaded");
});

test("gives back breeds with an animal", async () => {
  const breeds = ["Havanese", "Bichon Frise", "Poodle", "Corgie"];

  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    })
  );

  const { result, waitForNextUpdate } = renderHook(() => useBreedList("dog"));

  /**
   * waitForNextUpdate is basically used to tell the test that something async is about to happen and we need to wait for it
   */
  await waitForNextUpdate();

  const [breedList, status] = result.current;

  expect(status).toBe("loaded");
  expect(breedList).toEqual(breeds);
});
