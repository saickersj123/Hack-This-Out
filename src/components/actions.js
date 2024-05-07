export const REGISTER_USER = 'REGISTER_USER';

export function registerUser(dataToSubmit) {
  return {
    type: REGISTER_USER,
    payload: dataToSubmit,
  };
}