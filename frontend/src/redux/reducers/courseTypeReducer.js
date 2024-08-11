import {
    CREATE_COURSE_TYPE_FAIL,
    CREATE_COURSE_TYPE_REQUEST,
    CREATE_COURSE_TYPE_RESET,
    CREATE_COURSE_TYPE_SUCCESS,
    COURSE_TYPE_LOAD_FAIL,
    COURSE_TYPE_LOAD_REQUEST,
    COURSE_TYPE_LOAD_RESET,
    COURSE_TYPE_LOAD_SUCCESS,
    DELETE_COURSE_TYPE_FAIL,
    DELETE_COURSE_TYPE_REQUEST,
    DELETE_COURSE_TYPE_RESET,
    DELETE_COURSE_TYPE_SUCCESS,
    EDIT_COURSE_TYPE_FAIL,
    EDIT_COURSE_TYPE_REQUEST,
    EDIT_COURSE_TYPE_RESET,
    EDIT_COURSE_TYPE_SUCCESS,
} from "../constants/courseTypeConstant"

// load course type reducer
export const loadCourseTypeReducer = (state = { courseType: [] }, action) => {
    switch (action.type) {
        case COURSE_TYPE_LOAD_REQUEST:
            return { loading: true }
        case COURSE_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                courseType: action.payload.courseT
            }
        case COURSE_TYPE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case COURSE_TYPE_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

// create course type reducer
export const createCourseTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_COURSE_TYPE_REQUEST:
            return { loading: true }
        case CREATE_COURSE_TYPE_SUCCESS:
            return {
                loading: false,
                courseType: action.payload,
            }
        case CREATE_COURSE_TYPE_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_COURSE_TYPE_RESET:
            return {}
        default:
            return state;
    }

}

export const deleteCourseTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_COURSE_TYPE_REQUEST:
            return { loading: true }
        case DELETE_COURSE_TYPE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }
        case DELETE_COURSE_TYPE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_COURSE_TYPE_RESET:
            return {}
        default:
            return state;
    }
}

export const updateCourseTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_COURSE_TYPE_REQUEST:
            return { loading: true }
        case EDIT_COURSE_TYPE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                course: action.payload.course
            }
        case EDIT_COURSE_TYPE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case EDIT_COURSE_TYPE_RESET:
            return {}
        default:
            return state;
    }
}