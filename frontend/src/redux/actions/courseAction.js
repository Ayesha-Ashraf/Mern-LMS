import axios from 'axios';
import { toast } from 'react-toastify'
import {
    DELETE_COURSE_FAIL,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_SUCCESS,
    EDIT_COURSE_FAIL,
    EDIT_COURSE_REQUEST,
    EDIT_COURSE_SUCCESS,
    COURSE_LOAD_FAIL,
    COURSE_LOAD_REQUEST,
    COURSE_LOAD_SINGLE_FAIL,
    COURSE_LOAD_SINGLE_REQUEST,
    COURSE_LOAD_SINGLE_SUCCESS,
    COURSE_LOAD_SUCCESS,
    REGISTER_COURSE_FAIL,
    REGISTER_COURSE_REQUEST,
    REGISTER_COURSE_SUCCESS
} from "../constants/courseconstant"


export const courseLoadAction = (pageNumber, keyword = '', cat = '') => async (dispatch) => {
    dispatch({ type: COURSE_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/courses/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}`)
        dispatch({
            type: COURSE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: COURSE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// single course action
export const courseLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: COURSE_LOAD_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/course/${id}`);
        dispatch({
            type: COURSE_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: COURSE_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}


//delete single course action
export const deleteSingleCourseAction = (course_id) => async (dispatch) => {
    dispatch({ type: DELETE_COURSE_REQUEST });
    try {
        const { data } = await axios.delete(`/api/course/delete/${course_id}`);
        dispatch({
            type: DELETE_COURSE_SUCCESS,
            payload: data
        });
        toast.success("Course deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_COURSE_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//edit single course action
export const editSingleCourseAction = (course) => async (dispatch) => {
    dispatch({ type: EDIT_COURSE_REQUEST });
    try {
        const { data } = await axios.put(`/api/course/update/${course._id}`, course);
        dispatch({
            type: EDIT_COURSE_SUCCESS,
            payload: data
        });
        toast.success("Course updated successfully");
    } catch (error) {
        dispatch({
            type: EDIT_COURSE_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// register COURSE action
export const registerAcourseAction = (course) => async (dispatch) => {
    dispatch({ type: REGISTER_COURSE_REQUEST })

    try {
        const { data } = await axios.post("/api/course/create", course)
        dispatch({
            type: REGISTER_COURSE_SUCCESS,
            payload: data
        })
        toast.success("Course created successfully");

    } catch (error) {
        dispatch({
            type: REGISTER_COURSE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);
    }
}