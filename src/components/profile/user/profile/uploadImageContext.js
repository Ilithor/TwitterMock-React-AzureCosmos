import React, { createContext, useContext, useState } from 'react';

import * as fetchUtil from '../../../../util/fetch';

import { useCurrentUserData } from '../../currentUserContext';
import { useUserListData } from '../userListContext';

/** @type {React.Context<ImageUploadContextProps>} */
const imageUploadContext = createContext();

/**
 * @typedef ImageUploadContextProps
 * @property {Error} imageUploadError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setImageUploadError
 * @property {boolean} isLoadingImageUpload
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingImageUpload
 * @property {(formData:FormData)=>void} imageUpload
 */

/** This is a react component which you wrap your entire application
 * to provide a "context", meaning: data you can access anywhere in the app.
 *
 * @param {object} props
 * @param {React.ReactChild} props.children
 * @returns {React.FunctionComponent}
 */
export const ImageUploadProvider = ({ children }) => {
  const [imageUploadError, setImageUploadError] = useState();
  const [isLoadingImageUpload, setIsLoadingImageUpload] = useState(false);

  const { fetchCurrentUser } = useCurrentUserData();
  const { refreshUserList } = useUserListData();

  /** Updates the user's profile image
   *
   * @param {object} formData
   * @returns {Promise}
   */
  const imageUpload = async formData => {
    if (formData && localStorage?.Handle && !isLoadingImageUpload) {
      setIsLoadingImageUpload(true);
      await fetchUtil.user
        .uploadImage(formData)
        .then(async res => {
          if (res?.data === true) {
            Promise.all([fetchCurrentUser(), refreshUserList()]);
          }
        })
        .catch(err => {
          setImageUploadError(err);
          return Promise.reject(err);
        })
        .finally(() => {
          setIsLoadingImageUpload(false);
          return;
        });
    }
  };

  // Passing state to value to be passed to provider
  const value = {
    imageUploadError,
    setImageUploadError,
    isLoadingImageUpload,
    imageUpload,
  };

  return (
    <imageUploadContext.Provider value={value}>
      {children}
    </imageUploadContext.Provider>
  );
};

/**
 * @typedef UseUploadImageDataResult
 * @property {Error} imageUploadError
 * @property {React.Dispatch<React.SetStateAction<Error>>} setImageUploadError
 * @property {boolean} isLoadingImageUpload
 * @property {(formData:FormData)=>void} imageUpload
 */

/** A hook for consuming our User context in a safe way
 *
 * @example //getting the upload image function
 * import { useUploadImageData } from 'userContext'
 * const { uploadImage } = useUploadImageData();
 * @returns {UseUploadImageDataResult}
 */
export const useImageUploadData = () => {
  // Destructuring value from provider
  const ctx = useContext(imageUploadContext);

  if (ctx === undefined) {
    throw new Error('useImageUploadData must be within a ImageUploadProvider');
  }

  const {
    imageUploadError,
    setImageUploadError,
    isLoadingImageUpload,
    imageUpload,
  } = ctx;

  // What we want this consumer hook to actually return
  return {
    imageUploadError,
    setImageUploadError,
    isLoadingImageUpload,
    imageUpload,
  };
};
