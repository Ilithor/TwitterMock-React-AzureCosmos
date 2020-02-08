import React, { createContext, useContext, useState } from 'react';
import { useCurrentUserData } from '../../currentUserContext';
import * as fetchUtil from '../../../../util/fetch';

const editDetailContext = createContext();

export const EditDetailProvider = ({ children }) => {
  const [editDetailError, setEditDetailError] = useState();
  const [isLoadingEditDetail, setIsLoadingEditDetail] = useState(false);
  const { currentUser, fetchCurrentUser } = useCurrentUserData();

  const editDetail = async userParam => {
    if (userParam && !isLoadingEditDetail) {
      setIsLoadingEditDetail(true);
      if (
        userParam?.aboutMe === currentUser?.bio?.aboutMe &&
        userParam?.website === currentUser?.bio?.website &&
        userParam?.location === currentUser?.bio?.location
      ) {
        setIsLoadingEditDetail(false);
        return;
      }
      await fetchUtil.user
        .editUserDetail(userParam)
        .then(async res => {
          if (res?.data === true) {
            await fetchCurrentUser();
          } else {
            return Promise.reject(res?.data);
          }
        })
        .catch(err => {
          setEditDetailError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingEditDetail(false);
          return;
        });
    }
  };

  const value = { editDetailError, setEditDetailError, editDetail };
  return (
    <editDetailContext.Provider value={value}>
      {children}
    </editDetailContext.Provider>
  );
};

export const useEditDetailData = () => {
  const ctx = useContext(editDetailContext);

  if (ctx === undefined) {
    throw new Error('useEditDetailData must be within a EditDetailProvider');
  }

  const { editDetailError, setEditDetailError, editDetail } = ctx;

  return { editDetailError, setEditDetailError, editDetail };
};
