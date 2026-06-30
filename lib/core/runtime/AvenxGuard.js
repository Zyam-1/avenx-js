/**
 * Base class for all route guards in Avenx.
 * Guards determine if a route transition should proceed, abort, or redirect.
 */
export class AvenxGuard {
  /**
   * Determines whether the route can be activated.
   * Can return a boolean (true to allow, false to abort), a string (to redirect),
   * or a Promise resolving to either.
   * @param {object} to - The target route object (contains hash, page, params).
   * @param {object} from - The current route object (contains hash, page, params).
   * @returns {boolean|string|Promise<boolean|string>}
   */
  canActivate(to, from) {
    return true;
  }
}
