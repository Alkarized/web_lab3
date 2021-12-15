package ru.itmo.alkarized.lab3.validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("validatorY")
public class ValidatorY implements Validator {
    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        float y = Float.parseFloat(o.toString());
        if (!(-3 < y && y < 5 )){
            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                    "Введенное число выпадает из разрешенных значений X"));
        }
    }
}

/*
@RequestScoped
@FacesValidator("validatorY")
public class ValidatorY implements Validator<Float> {
    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Float o) throws ValidatorException {
        //System.out.println("test1");
        FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, "h1", null);
        throw new ValidatorException(facesMessage);
        //FacesContext.getCurrentInstance().getPartialViewContext().getRenderIds().clear();
        */
/*try {
            System.out.println("test2");

            float y = Float.parseFloat(o.toString());
            if (!(-3 < y && y < 5 )){
                throw new OutOfBoundException();
            }
        } catch (NumberFormatException e){
            System.out.println("test3");
           *//*
*/
/* FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, "h1", null);
            FacesContext.getCurrentInstance().addMessage(null, facesMessage);
            FacesContext.getCurrentInstance().getPartialViewContext().getRenderIds().add("y_error_message");*//*
*/
/*
        } catch (OutOfBoundException e){
            System.out.println("test4");
            *//*
*/
/*FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, "h2", null);
            FacesContext.getCurrentInstance().addMessage(null, facesMessage);
            FacesContext.getCurrentInstance().getPartialViewContext().getRenderIds().add("y_error_message");*//*
*/
/*
        }*//*

    }
}
*/
