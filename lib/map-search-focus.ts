let shouldFocusMapSearch = false;

export function requestMapSearchFocus() {
  shouldFocusMapSearch = true;
}

export function consumeMapSearchFocus() {
  const requested = shouldFocusMapSearch;
  shouldFocusMapSearch = false;
  return requested;
}
