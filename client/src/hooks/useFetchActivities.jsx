/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../redux/actions/activities";

export const useFetchActivities = () => {
    const dispatch = useDispatch();

    const activities = useSelector(state => state.activities.activities);

    useEffect(() => {
        if (!activities.loaded) dispatch(getActivities());
    }, [activities]);
    
    return { activities }
}