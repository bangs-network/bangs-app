import { SessionsActions } from './sessions.actions';
import { ConfState } from './conf.state';

export const sessionsReducer = (state: ConfState, action: SessionsActions) => {
  switch (action.type) {
    case 'set-conf-loading': {
      return { ...state, loading: action.isLoading };
    }
    case 'set-menu-enabled': {
      return { ...state, menuEnabled: action.menuEnabled };
    }
  }
};