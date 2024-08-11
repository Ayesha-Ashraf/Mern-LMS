import {
    DELETE_COURSE_FAIL,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_RESET,
    DELETE_COURSE_SUCCESS,
    EDIT_COURSE_FAIL,
    EDIT_COURSE_REQUEST,
    EDIT_COURSE_RESET,
    EDIT_COURSE_SUCCESS,
    COURSE_LOAD_FAIL,
    COURSE_LOAD_REQUEST,
    COURSE_LOAD_RESET,
    COURSE_LOAD_SINGLE_FAIL,
    COURSE_LOAD_SINGLE_REQUEST,
    COURSE_LOAD_SINGLE_RESET,
    COURSE_LOAD_SINGLE_SUCCESS,
    COURSE_LOAD_SUCCESS,
    REGISTER_COURSE_FAIL,
    REGISTER_COURSE_REQUEST,
    REGISTER_COURSE_RESET,
    REGISTER_COURSE_SUCCESS
} from "../constants/courseconstant"


export const loadCourseReducer = (state = { courses: [] }, action) => {
    switch (action.type) {
        case COURSE_LOAD_REQUEST:
            return { loading: true }
        case COURSE_LOAD_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                page: action.payload.page,
                pages: action.payload.pages,
                count: action.payload.count,
                setUniqueLocation: action.payload.setUniqueLocation,
                courses: action.payload.courses
            }
        case COURSE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case COURSE_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

// single course reducer
export const loadCourseSingleReducer = (state = { course: {} }, action) => {
    switch (action.type) {
        case COURSE_LOAD_SINGLE_REQUEST:
            return { loading: true }
        case COURSE_LOAD_SINGLE_SUCCESS:
            return {

                loading: false,
                success: action.payload.success,
                singleCourse: action.payload.course,

            }
        case COURSE_LOAD_SINGLE_FAIL:
            return { loading: false, error: action.payload }
        case COURSE_LOAD_SINGLE_RESET:
            return {}
        default:
            return state;
    }

}

//Registred course;
export const registerAcourseReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_COURSE_REQUEST:
            return { loading: true }
        case REGISTER_COURSE_SUCCESS:
            return {
                loading: false,
                course: action.payload,
            }
        case REGISTER_COURSE_FAIL:
            return { loading: false, error: action.payload }
        case REGISTER_COURSE_RESET:
            return {}
        default:
            return state;
    }
}

// delete course by id
//delete product by id
export const deleteCourseReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_COURSE_REQUEST:
            return { loading: true }
        case DELETE_COURSE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }
        case DELETE_COURSE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_COURSE_RESET:
            return {}
        default:
            return state;
    }
}

export const updateCourseReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_COURSE_REQUEST:
            return { loading: true }
        case EDIT_COURSE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                course: action.payload.course
            }
        case EDIT_COURSE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case EDIT_COURSE_RESET:
            return {}
        default:
            return state;
    }
}