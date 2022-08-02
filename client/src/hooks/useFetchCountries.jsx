/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../redux/actions/countries";

export const useFetchCountries = (restart = false) => {
    const dispatch = useDispatch();

    const filteredCountries = useSelector(state => state.countries.filteredCountries);
    const loaded = useSelector(state => state.countries.loaded);

    useEffect(() => {
        if (!loaded || restart) dispatch(getCountries());
    }, [loaded]);

    return { filteredCountries, loaded }
}