// Framer renders the native callback form before the React favorites widget
// mounts. Register the payload binding and submit guard in the published head.
const { tree } = api
const inquiryReadinessName = "Admiral Park inquiry payload readiness"
const inquiryReadiness = {
    name: inquiryReadinessName,
    pageIds: ["XLriEYHai"],
    placement: "headEnd",
    loadMode: "once",
    code: `<script>
(() => {
  const inquiryField = "Kiválasztott lakás";

  function inquiryApartment(form) {
    if (!(form instanceof HTMLFormElement) || !form.querySelector("[data-admiral-form-favourites]")) return "";
    const apartment = new URLSearchParams(location.search).get("apartment")?.trim().toUpperCase() || "";
    return /^[A-Z][0-9]{3}[A-Z]?$/.test(apartment) ? apartment : "";
  }

  document.addEventListener("formdata", (event) => {
    const apartment = inquiryApartment(event.target);
    if (apartment) event.formData.set(inquiryField, apartment);
  }, true);

  window.addEventListener("submit", (event) => {
    const form = event.target;
    const apartment = inquiryApartment(form);
    if (!apartment) return;
    // Run before Framer's document handler and wait for the widget's named
    // control so both DOM inspection and FormData carry the same apartment.
    const input = form.elements.namedItem(inquiryField);
    if (input instanceof HTMLInputElement && !input.disabled && input.value === apartment) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
})();
</script>`,
}

const installedInquiryReadiness = tree.getNodesOfTypes("CustomCodeNode").find(node => node.name === inquiryReadinessName)
if (installedInquiryReadiness) tree.patch(installedInquiryReadiness.id, inquiryReadiness)
else tree.insert("CustomCodeNode", inquiryReadinessName, { parent: tree.root.id, ...inquiryReadiness })
