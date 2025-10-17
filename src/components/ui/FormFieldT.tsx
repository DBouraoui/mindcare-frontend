import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import FieldInfo from "@/components/ui/FieldInfo";

export default function FormFieldT({form, inputName, inputLabel, inputType, placeHolder}){
    return (
        <>
            <form.Field
                name={inputName}
                children={(field) => (
                    <Field>
                        <FieldLabel htmlFor={field.name}>{inputLabel}</FieldLabel>
                        <Input
                            type={inputType}
                            name={field.name}
                            placeholder={placeHolder}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                    </Field>
                )}
            /></>
    )
}