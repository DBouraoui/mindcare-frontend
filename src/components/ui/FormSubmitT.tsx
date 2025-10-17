import {CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function FormSubmitT({form, buttonLabel, buttonLabelWaiting})
{
    return (
        <>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <CardFooter className="pt-2">
                        <Button
                            type="submit"
                            disabled={!canSubmit}
                            className="w-full sm:w-auto"
                        >
                            {isSubmitting ? buttonLabelWaiting : buttonLabel}
                        </Button>
                    </CardFooter>
                )}
            />
        </>
    )
}