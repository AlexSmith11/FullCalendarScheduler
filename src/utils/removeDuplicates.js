import { invitesMatch } from "./invitesMatch";
/**
 * Remove any duplicate invites recieved from the API
 */

export function removeDuplicates(invites) {
    for (let i = 0; i < invites.length; i++) {
        const lastInvite = invites[i - 1];
        const currentInvite = invites[i];
        // Remove duplicate invite on a match
        if (i === 0) {
            continue;
        } else if (invitesMatch(lastInvite, currentInvite)) {
            invites.splice(i, 1);
            i -= 1;
            continue;
        }
    }
    return invites
}