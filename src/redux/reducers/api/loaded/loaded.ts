export const loadedReducer = (state = {}, action: any) => {
  const { type } = action;
  const matches = /(.*)_(SUCCESS)/.exec(type);

  if (!matches) return state;

  const [, requestName] = matches;
  return {
    ...state,
    [requestName]: true,
  };
};
