import re

file_path = 'c:/Users/rober/Documents/PCB_System2-main/PCB_System2-main/correos-maestros-tabla.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Header
header_pattern = r'(<th data-translate="Correo Electrónico">Correo Electrónico</th>\s*</tr>)'
new_header = r'<th data-translate="Correo Electrónico">Correo Electrónico</th>\n            <th data-translate="Asignatura">Asignatura</th>\n            <th data-translate="Horario Capacitación">Horario Capacitación</th>\n            <th data-translate="Grado">Grado</th>\n          </tr>'
content = re.sub(header_pattern, new_header, content)

# 2. Update Rows
# Find all rows in tbody. Looking for the closing of the second td and the closing tr
# Structure: <td>...</td>\n            <td>...</td>\n          </tr>
# We want to insert 3 tds before </tr>
row_pattern = r'(<td><a href="mailto:.*?" class="email-link">.*?</a></td>)\s*</tr>'
new_row_suffix = r'\1\n            <td>---</td>\n            <td>---</td>\n            <td>---</td>\n          </tr>'
content = re.sub(row_pattern, new_row_suffix, content)

# 3. Update Search Section
search_section_pattern = r'(<!-- Buscador -->\s*<div style="text-align: center;">\s*<input[^>]*>\s*</div>)'
new_search_section = r'''<!-- Filtros Avanzados -->
      <div class="filters-container" style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; border: 1px solid #e9ecef;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <!-- Buscador -->
            <div>
                <label for="searchInput" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #34495e;">Buscar:</label>
                <input type="text" id="searchInput" class="search-box" placeholder="Nombre o Email..." style="margin: 0; width: 100%;" onkeyup="filterTable()">
            </div>
            <!-- Filtro Asignatura -->
            <div>
                <label for="subjectFilter" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #34495e;">Asignatura:</label>
                <select id="subjectFilter" class="search-box" style="margin: 0; width: 100%;" onchange="filterTable()">
                    <option value="">Todas</option>
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Ciencia">Ciencia</option>
                    <option value="Historia">Historia</option>
                    <option value="Vocacional">Vocacional</option>
                    <option value="Educación Física">Educación Física</option>
                    <option value="Bellas Artes">Bellas Artes</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>
            <!-- Filtro Grado -->
            <div>
                <label for="gradeFilter" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #34495e;">Grado:</label>
                <select id="gradeFilter" class="search-box" style="margin: 0; width: 100%;" onchange="filterTable()">
                    <option value="">Todos</option>
                    <option value="9">9no</option>
                    <option value="10">10mo</option>
                    <option value="11">11mo</option>
                    <option value="12">12mo</option>
                </select>
            </div>
        </div>
      </div>'''

content = content.replace('          placeholder="🔍 Buscar maestro..."\n          onkeyup="filterTable()"\n        >\n      </div>', 'PLACEHOLDER_REPLACEMENT') # simple replace might be tricky with multiline. 
# Let's use regex for the div replacement
content = re.sub(r'<!-- Buscador -->[\s\S]*?</div>\s*</div>', new_search_section, content, count=1)


# 4. Update Script
script_pattern = r'function filterTable\(\) \{[\s\S]*?\}'
new_script = r'''function filterTable() {
      const searchInput = document.getElementById('searchInput').value.toUpperCase();
      const subjectFilter = document.getElementById('subjectFilter').value.toUpperCase();
      const gradeFilter = document.getElementById('gradeFilter').value.toUpperCase();
      
      const table = document.getElementById('emailTable');
      const tr = table.getElementsByTagName('tr');

      for (let i = 1; i < tr.length; i++) {
        const tds = tr[i].getElementsByTagName('td');
        if (tds.length > 0) {
          const name = tds[0].textContent.toUpperCase();
          const email = tds[1].textContent.toUpperCase();
          const subject = tds[2].textContent.toUpperCase();
          const grade = tds[4].textContent.toUpperCase();
          
          const nameEmail = name + " " + email;

          const matchesSearch = nameEmail.indexOf(searchInput) > -1;
          const matchesSubject = subjectFilter === "" || subject.indexOf(subjectFilter) > -1;
          const matchesGrade = gradeFilter === "" || grade.indexOf(gradeFilter) > -1;

          if (matchesSearch && matchesSubject && matchesGrade) {
            tr[i].style.display = '';
          } else {
            tr[i].style.display = 'none';
          }
        }
      }
    }'''
content = re.sub(script_pattern, new_script, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("File updated successfully")
