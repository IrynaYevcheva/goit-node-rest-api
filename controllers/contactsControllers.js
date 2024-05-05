import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  changeContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  const contacts = await listContacts();
  try {
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactToFind = await getContactById(id);
    if (!contactToFind) {
      throw HttpError(404);
    }
    res.json(contactToFind);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactToDelete = await removeContact(id);
    if (!contactToDelete) {
      throw HttpError(404);
    }
    res.json(contactToDelete);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await changeContact(id, req.body);
    if (!updatedContact) {
      throw HttpError(404);
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
