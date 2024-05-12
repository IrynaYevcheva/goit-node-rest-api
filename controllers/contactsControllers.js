import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

export const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactToFind = await Contact.findById(id);
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
    const contactToDelete = await Contact.findByIdAndDelete(id);
    if (!contactToDelete) {
      throw HttpError(404);
    }
    res.json(contactToDelete);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await Contact.create(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(id, contact);
    if (!updatedContact) {
      throw HttpError(404);
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    console.log(req.body);
    const contact = await Contact.findByIdAndUpdate(id, favorite);
    if (!contact) {
      throw HttpError(404);
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
