document.addEventListener("DOMContentLoaded", () => {

    const checkboxes =
        document.querySelectorAll(
            ".checklist input[type='checkbox']"
        );

    checkboxes.forEach((checkbox) => {

        const saved =
            localStorage.getItem(checkbox.id);

        if (saved === "true") {
            checkbox.checked = true;
        }

        checkbox.addEventListener("change", () => {

            localStorage.setItem(
                checkbox.id,
                checkbox.checked
            );

        });

    });

});
