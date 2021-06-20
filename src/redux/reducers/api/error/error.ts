export const errorReducer = (state = {}, action: any) => {
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|ERROR)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === "ERROR" ? payload.error : "",
  };
};
