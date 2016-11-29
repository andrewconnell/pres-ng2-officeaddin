import { Injectable } from '@angular/core';

@Injectable()
export class OfficeService {
  /**
   * Retrieves word candidates from the body of the currently selected email in
   * the hosting Outlook client.
   *
   * @returns Promise<string[]>   - Promise of an array of words that could be people's names.
   */
  public getWordCandidatesFromEmail(): Promise<string[]> {
    let promise: Promise<string[]> = new Promise<string[]>((resolve, reject) => {
      try {
        let currentEmail: Office.Types.ItemRead = Office.cast.item.toItemRead(Office.context.mailbox.item);
        console.log('getWordCandidatesFromEmail(): currentEmail', currentEmail);

        let candidates: string[] = currentEmail.getRegExMatchesByName('PossibleName');
        console.log('getWordCandidatesFromEmail(): candidates in email', candidates);

        resolve(candidates);
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

}
