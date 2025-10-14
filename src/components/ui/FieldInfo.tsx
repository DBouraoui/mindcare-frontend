import {AnyFieldApi} from "@tanstack/form-core";

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && !field.state.meta.isValid && (
                <div className="mt-1 text-sm text-red-500 animate-fadeIn">
                    {field.state.meta.errors.map((err, i) => (
                        <p key={i} className="flex items-center gap-1">
                            <span className="text-xs">⚠️</span>
                            <em>{err.message}</em>
                        </p>
                    ))}
                </div>
            )}

            {field.state.meta.isValidating && (
                <p className="mt-1 text-xs text-blue-500 italic animate-pulse">
                    Validation en cours...
                </p>
            )}
        </>
    )
}