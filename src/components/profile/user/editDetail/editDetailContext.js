import React, { createContext, useContext, useState } from 'react';
import _ from 'lodash';
import * as fetchUtil from '../../../../util/fetch';

import { useCurrentUserData } from '../../currentUserContext';

/** @type {React.Context<EditDetailContextProps>} */
const editDetailContext = createContext();

/**
 * @typedef EditDetailContextProps
 * @property {Error} editDetailError
 * @property {React.Dispatch} setEditDetailError
 * @property {()=>void} editDetail
 */

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 */
export const EditDetailProvider = ({ children }) => {
  const [editDetailError, setEditDetailError] = useState();
  const [isLoadingEditDetail, setIsLoadingEditDetail] = useState(false);
  const { currentUser, fetchCurrentUser } = useCurrentUserData();

  /** Attempts to edit the user's bio
   *
   * @param {{aboutMe:string,website:string,location:string}} userParam
   * @returns {void|Error}
   */
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

  /** Checks if the user details provided are valid
   *
   * @param {{aboutMe:string,website:string,location:string}} userParam
   * @returns {{aboutMe:string,website:string,location:string}}
   */
  const validationCheckUserDetail = userParam => {
    let err;
    if (
      isEmpty(userParam?.aboutMe) &&
      isEmpty(userParam?.website) &&
      isEmpty(userParam?.location)
    ) {
      err = {
        general:
          'At least one field must be filled before this form can be submitted',
      };
      setEditDetailError(err);
      return userParam;
    }
    if (!isWebsite(userParam?.website)) {
      err = {
        website: 'Must be a valid website',
      };
    } else {
      err = undefined;
    }
    setEditDetailError(err);
    return userParam;
  };

  /** Checks if provided string is empty
   *
   * @param {string} string
   * @returns {boolean}
   */
  const isEmpty = string => {
    if (string.trim() === '') {
      return true;
    }
    return false;
  };

  /** Checks if provided website is valid
   *
   * @param {string} website
   * @returns {boolean}
   */
  const isWebsite = website => {
    if (_.includes(website, '.')) {
      return true;
    }
    return false;
  };

  const value = {
    editDetailError,
    setEditDetailError,
    editDetail,
    validationCheckUserDetail,
    isLoadingEditDetail,
  };
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

  const {
    editDetailError,
    setEditDetailError,
    editDetail,
    validationCheckUserDetail,
    isLoadingEditDetail,
  } = ctx;

  return {
    editDetailError,
    setEditDetailError,
    editDetail,
    validationCheckUserDetail,
    isLoadingEditDetail,
  };
};
