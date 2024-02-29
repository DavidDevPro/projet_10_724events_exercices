import { fireEvent, render, screen } from "@testing-library/react";
import Select from "./index";

describe("When a select is created", () => { // le composant select est rendu avec les choix d'options et une option par défaut?
  it("a list of choices is displayed", () => {
    render(<Select selection={["value1", "value2"]} />);
    const selectElement = screen.getByTestId("select-testid");
    const selectDefault = screen.getByText("Toutes");
    expect(selectElement).toBeInTheDocument();
    expect(selectDefault).toBeInTheDocument();
  });
  it("a collapse action button is displayed", () => { //le bouton colapse est t-il bien affiché?
    render(<Select selection={["value1", "value2"]} />);
    const collapseButtonElement = screen.getByTestId("collapse-button-testid");
    expect(collapseButtonElement).toBeInTheDocument();
  });

  describe("with a label", () => {
    it("a label is displayed", () => { // le label est correctement affiché lorsque select à un label?
      render(<Select label="label" selection={["value1", "value2"]} />);
      const labelDefault = screen.getByText("label");
      expect(labelDefault).toBeInTheDocument();
    });
  });

  describe("and a click is trigger on collapse button", () => { //la liste des options est-elle affiché lorsque l'utilisateur clique sur le bouton de collapse?
    it("a list of values is displayed", () => {
      render(<Select selection={["value1", "value2"]} />);
      const collapseButtonElement = screen.getByTestId(
        "collapse-button-testid"
      );
      fireEvent(
        collapseButtonElement, // simulation d'un clic sur le bouton de collapse
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
      const choice1 = screen.getByText("value1"); // récupération des options individuelles
      const choice2 = screen.getByText("value2");
      expect(choice1).toBeInTheDocument();
      expect(choice2).toBeInTheDocument();
    });
    describe("and a click is triggered on a choice item", () => {
      it("a onChange callback is called", () => { // la fonction de rappel onChange est-elle appelée lorsque l'utilisateur sélectionne une option?
        const onChange = jest.fn();
        render(<Select selection={["value1", "value2"]} onChange={onChange} />);
        const collapseButtonElement = screen.getByTestId(
          "collapse-button-testid"
        );
        fireEvent(
          collapseButtonElement, // simulation d'un clic sur le bouton de collapse
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        const choice1 = screen.getByText("value1"); // Récupère le premier choix value1
        fireEvent(
          choice1,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        expect(onChange.mock.calls.length).toBeGreaterThan(0); // fonction de rappel onChange a été appelée au moins une fois?

        fireEvent(
          collapseButtonElement, // simulation d'un clic sur le bouton de collapse
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );

        const choiceAll = screen.getByText("Toutes"); // Récupère l'option "Toutes"
        fireEvent(
          choiceAll,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        expect(onChange.mock.calls.length).toBeGreaterThan(1); // la fonction de rappel onChange a été appelée au moins une fois de plus?
      });
    });
  });
});
