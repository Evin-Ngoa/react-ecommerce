import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { InputLabel, Select, MenuItem, Grid } from '@material-ui/core';

function FormSelect({   label, value, onChange, data }) {
  const { control } = useFormContext();


  return (
    <Grid item xs={12} sm={6}>
       <Controller
            control={control}
            render = {({ field})=> (
                <>
                    <InputLabel>{label}</InputLabel>
                    <Select value={value} fullWidth onChange={onChange}>
                        {data.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </>
            )}
         />
    </Grid>
  );
}

export default FormSelect;