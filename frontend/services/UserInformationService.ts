interface ISaveUserInformationOptions {
  firstName: string;
  lastName: string;
  age: number;
  occupation: string;
  gender: string;
}

export class UserInformationService {
  constructor() {
    console.log('UserInformationService.constructor()');
  }

  public async saveUserInformation(options: ISaveUserInformationOptions): Promise<void> {
    console.log('UserInformationService.saveUserInformation()');
    console.log('options:', options);

    try {
      const response = await fetch('/api/user-information', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API request failed with status ${response.status}: ${errorData.message || response.statusText}`,
        );
      }

      const result = await response.json();
      console.log('User information saved successfully:', result);
    } catch (error) {
      console.error('Failed to save user information:', error);
      throw error;
    }
  }
}
