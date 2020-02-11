import React, { createContext, useContext, useState } from 'react';

import * as fetchUtil from '../../util/fetch';

const settingContext = createContext();

export const SettingProvider = ({ children }) => {
  const [settingError, setSettingError] = useState();
  const [isMatching, setIsMatching] = useState(false);

  /** Deletes the current user
   *
   * @param {{userHandle:string}} userParam
   * @returns {void|Error}
   */
  const deleteUser = async userParam => {
    const success = await isMatch(userParam);
    if (success === true) {
      await fetchUtil.user
        .deleteUser(userParam?.userHandle)
        .then(res => {
          if (!!res?.data?.userHandle) {
            return Promise.reject(res?.data);
          }
        })
        .catch(err => {
          return Promise.reject(err);
        })
        .finally(() => {
          return;
        });
    } else {
      return Promise.reject(success);
    }
  };

  /** Checks if provided userHandle matches the local storage
   *
   * @param {{userHandle:string}} userParam
   * @returns {boolean|{userHandle:string}}
   */
  const isMatch = userParam => {
    if (userParam?.userHandle === localStorage?.Handle) {
      return true;
    }
    return {
      userHandle: 'Does not match',
    };
  };

  /** Checks if the provider userHandle is valid
   *
   * @param {{userHandle: string}} userParam
   * @returns {{userHandle: string}}
   */
  const validationMatching = userParam => {
    let err;
    if (isEmpty(userParam?.userHandle)) {
      err = {
        userHandle: 'Must not be empty',
      };
      setSettingError(err);
      setIsMatching(false);
      return userParam;
    }
    if (userParam?.userHandle !== localStorage?.Handle) {
      err = {
        userHandle: 'Does not match',
      };
      setIsMatching(false);
    } else {
      err = undefined;
      setIsMatching(true);
    }
    setSettingError(err);
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
    } else {
      return false;
    }
  };

  // Passing state to value to be passed to provider
  const value = {
    settingError,
    setSettingError,
    deleteUser,
    validationMatching,
    isMatching,
  };
  return (
    <settingContext.Provider value={value}>{children}</settingContext.Provider>
  );
};

/** @typedef UseSettingDataResult
 * @property {Error} [settingError]
 * @property {(data:{userHandle:string})=>void} deleteUser
 */

/** A hook for consuming our Setting context in a safe way
 *
 * @example //getting the delete user function
 * import { useSettingData } from 'settingContext'
 * const { deleteUser } = useSettingData();
 * @returns {UseSettingDataResult}
 */
export const useSettingData = () => {
  // Destructuring value from provider
  const ctx = useContext(settingContext);

  if (ctx === undefined) {
    throw new Error('useSettingContext must be used within a SettingProvider');
  }

  const { settingError, setSettingError, deleteUser } = ctx;

  // What we want this consumer hook to actually return
  return { settingError, setSettingError, deleteUser };
};

/** @typedef UseValidationDeleteUserResult
 *
 * @property {(data:{userHandle:string})=>data:{userHandle:string}} validationMatching
 * @property {Error} settingError
 */

/** A hook for consuming our Setting context in a safe way
 *
 * @example //getting the validation matching function
 * import { useValidationDeleteUser } from 'settingContext'
 * const { validationMatching } = useValidationDeleteUser();
 * @returns {UseValidationDeleteUserResult}
 */
export const useValidationDeleteUser = () => {
  const ctx = useContext(settingContext);

  if (ctx === undefined) {
    throw new Error(
      'useValidationDeleteUser must be used within a SettingProvider'
    );
  }

  const { validationMatching, isMatching } = ctx;

  return { validationMatching, isMatching };
};
