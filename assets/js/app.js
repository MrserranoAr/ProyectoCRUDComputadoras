const servicesTable = document.querySelector("#servicesTable");
const serviceForm = document.querySelector("#serviceForm");
const serviceIdInput = document.querySelector("#serviceId");
const clientNameInput = document.querySelector("#clientName");
const deviceInput = document.querySelector("#device");
const serviceTypeInput = document.querySelector("#serviceType");
const statusInput = document.querySelector("#status");
const priceInput = document.querySelector("#price");
const submitButton = document.querySelector("#submitButton");

let services = JSON.parse(localStorage.getItem("bajaRespawServices")) || [];

function saveServices() {
    localStorage.setItem("bajaRespawServices", JSON.stringify(services));
}

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
            <td>
                <button class="btn-editar" onclick="editService(${service.id})">Editar</button>
                <button class="btn-eliminar" onclick="deleteService(${service.id})">Eliminar</button>
            </td>
        `;

        servicesTable.appendChild(row);
    });
}

serviceForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const serviceId = serviceIdInput.value;

    const serviceData = {
        id: serviceId ? Number(serviceId) : Date.now(),
        clientName: clientNameInput.value,
        device: deviceInput.value,
        serviceType: serviceTypeInput.value,
        status: statusInput.value,
        price: priceInput.value
    };

    if (serviceId) {
        services = services.map(function (service) {
            if (service.id === Number(serviceId)) {
                return serviceData;
            }

            return service;
        });
    } else {
        services.push(serviceData);
    }

    saveServices();
    renderServices();
    serviceForm.reset();
    serviceIdInput.value = "";
    submitButton.textContent = "Guardar servicio";
});

function editService(id) {
    const serviceToEdit = services.find(function (service) {
        return service.id === id;
    });

    serviceIdInput.value = serviceToEdit.id;
    clientNameInput.value = serviceToEdit.clientName;
    deviceInput.value = serviceToEdit.device;
    serviceTypeInput.value = serviceToEdit.serviceType;
    statusInput.value = serviceToEdit.status;
    priceInput.value = serviceToEdit.price;
    submitButton.textContent = "Actualizar servicio";
}

function deleteService(id) {
    const serviceToDelete = services.find(function (service) {
        return service.id === id;
    });

    const confirmDelete = confirm("Deseas eliminar el servicio de " + serviceToDelete.clientName + "?");

    if (confirmDelete) {
        services = services.filter(function (service) {
            return service.id !== id;
        });

        saveServices();
        renderServices();
    }
}

renderServices();
