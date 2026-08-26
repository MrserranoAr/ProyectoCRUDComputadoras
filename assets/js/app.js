const servicesTable = document.querySelector("#servicesTable");
const serviceForm = document.querySelector("#serviceForm");
const clientNameInput = document.querySelector("#clientName");
const deviceInput = document.querySelector("#device");
const serviceTypeInput = document.querySelector("#serviceType");
const statusInput = document.querySelector("#status");
const priceInput = document.querySelector("#price");

const services = [];

function renderServices() {
    servicesTable.innerHTML = "";

    services.forEach(function (service) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${service.clientName}</td>
            <td>${service.device}</td>
            <td>${service.serviceType}</td>
            <td>${service.status}</td>
            <td>$${service.price}</td>
            <td>Registrado</td>
        `;

        servicesTable.appendChild(row);
    });
}

serviceForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newService = {
        id: Date.now(),
        clientName: clientNameInput.value,
        device: deviceInput.value,
        serviceType: serviceTypeInput.value,
        status: statusInput.value,
        price: priceInput.value
    };

    services.push(newService);
    renderServices();
    serviceForm.reset();
});

renderServices();
