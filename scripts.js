document.addEventListener('DOMContentLoaded', function() {
    
    // a autenticação de login
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {           
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('username');            
            window.location.href = 'login.html';
        });
    }   
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();         
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;      
        if (username === 'admin' && password === '123') {
            sessionStorage.setItem('isAuthenticated', true); 
            sessionStorage.setItem('username', username);            
            window.location.href = 'index.html';        
        } else {
            alert('Usuário ou senha incorretos. Por favor, tente novamente.');
        }
    });
});

  
    const searchInput = document.getElementById('search');
    const statusFilter = document.getElementById('status-filter');
    const ticketsTable = document.getElementById('tickets-table')?.getElementsByTagName('tbody')[0];
    const highPriorityCount = document.getElementById('high-priority-count');
    const mediumPriorityCount = document.getElementById('medium-priority-count');
    const lowPriorityCount = document.getElementById('low-priority-count');

    
    // atualiza aqueles balões de prioridades
    function updatePriorityReport() {
        let highCount = 0;
        let mediumCount = 0;
        let lowCount = 0;

        if (ticketsTable) {
            for (const row of ticketsTable.rows) {
                const priorityCell = row.cells[4];

                if (priorityCell.classList.contains('prioridade-alta')) {
                    highCount++;
                } else if (priorityCell.classList.contains('prioridade-media')) {
                    mediumCount++;
                } else if (priorityCell.classList.contains('prioridade-baixa')) {
                    lowCount++;
                }
            }
        }

        highPriorityCount.textContent = highCount;
        mediumPriorityCount.textContent = mediumCount;
        lowPriorityCount.textContent = lowCount;
    }

    // filtro do aberto e fechado
    function filterTickets() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusValue = statusFilter.value;

        if (ticketsTable) {
            for (const row of ticketsTable.rows) {
                const [idCell, dateCell, subjectCell, statusCell] = row.cells;
                const matchesSearch = subjectCell.textContent.toLowerCase().includes(searchTerm);
                const matchesStatus = statusValue === 'todos' || statusCell.textContent.toLowerCase() === statusValue;

                if (matchesSearch && matchesStatus) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none'
                }
            }
        }

        updatePriorityReport();
    }

    if (searchInput && statusFilter) {
        searchInput.addEventListener('input', filterTickets);
        statusFilter.addEventListener('change', filterTickets);
        updatePriorityReport();
    }

   // botão criar chamado
    const createTicketBtn = document.querySelector('.create-ticket-btn');
    if (createTicketBtn) {
        createTicketBtn.addEventListener('click', function () {
            window.location.href = 'create-ticket.html';
        });
    }

    const myTicketsTable = document.getElementById('my-tickets-table')?.getElementsByTagName('tbody')[0];
    let tickets = JSON.parse(localStorage.getItem('tickets')) || [];

 // Aqui desbloqueia as paradas das opções estabeleciadas  
 // ainda faltar fazer as outras
 // e só copiar e colar 
 // ta misturado com TypeScript 
    const prioritySelect = document.getElementById('priority');
    const informaticaTiOptions = document.getElementById('informatica-ti-options');
    const rhOptions = document.getElementById('rh-options');
    const contOptions = document.getElementById('cont-options')

    prioritySelect.addEventListener('change', function() {
        informaticaTiOptions.style.display = 'none';
        rhOptions.style.display = 'none';
        contOptions.style.display = 'none';

        if (prioritySelect.value === 'informatica-ti') {
            informaticaTiOptions.style.display = 'block';
        } else if (prioritySelect.value === 'rh') {
            rhOptions.style.display = 'block';
        }else if(prioritySelect.value === 'contabilidade'){
            contOptions.style.display = 'block';
        }
    });



 
    function renderMyTickets() {
        if (myTicketsTable) {
            myTicketsTable.innerHTML = '';
            const userTickets = tickets.filter(ticket => ticket.username === sessionStorage.getItem('username'));
            userTickets.forEach(ticket => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${ticket.id}</td>
                    <td>${ticket.date}</td>
                    <td>${ticket.subject}</td>
                    <td>${ticket.status}</td>
                    <td>${ticket.priority}</td>
                    <td>${ticket.sector}</td>
                    <td>${ticket.phone}</td>
                `;
                myTicketsTable.appendChild(row);
            });
        }
    }

   
   // criação do formulario 
    const createTicketForm = document.getElementById('create-ticket-form');
    if (createTicketForm) {
        createTicketForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const newTicket = {
                id: tickets.length + 1,
                date: new Date().toLocaleDateString('pt-BR'),
                name: document.getElementById('name').value,
                sector: document.getElementById('sector').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                priority: document.getElementById('priority').value,
                username: sessionStorage.getItem('username')
            };

            tickets.push(newTicket);
            localStorage.setItem('tickets', JSON.stringify(tickets));
            renderMyTickets();
            alert('Chamado criado com sucesso!');
            createTicketForm.reset();
        });
    }

    renderMyTickets();


    //botão voltar 
    const btnVoltar = document.getElementById('back-btn');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', function() {
            window.history.back();
        });
    }
     


    // ////////////////////////////////////////////////////////////////////////////////////////////////////////

   
    
