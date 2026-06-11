# QA Fintech — Parabank Playwright Automation

## Descripción
Proyecto de automatización E2E sobre la aplicación bancaria demo **Parabank** usando Playwright y TypeScript. Cubre 6 módulos con 42 casos de prueba automatizados.

## Stack
- Playwright + TypeScript
- GitHub Actions (CI/CD)
- Page: parabank.parasoft.com

## Módulos automatizados
| Módulo | TCs | Notas |
|---|---|---|
| Login | 9 | TC02 detecta BUG-2 |
| Register | 9 | Limitado por Cloudflare |
| Open Account | 4 | TC03-TC04 detectan bugs |
| Transfer Funds | 5 | TC02-TC05 detectan bugs |
| Bill Pay | 7 | TC05 detecta BUG-12 |
| Request Loan | 8 | TC02-TC08 detectan bugs |
| **Total** | **42** | |

## Ejecución local
```bash
npx playwright test
```

## Limitaciones del ambiente
- Parabank es un ambiente demo público que resetea su base de datos periódicamente
- El módulo Register está limitado por protección Cloudflare
- Los números de cuenta pueden variar — ejecutar Admin Page > Initialize antes de correr los tests
- CI/CD puede fallar por las mismas razones — el código es correcto pero el ambiente es inestable

## Autor
**Jose Jimenez** — QA Engineer
[LinkedIn](https://www.linkedin.com/in/josejimenez07) | [GitHub](https://github.com/engineerqajimenez-jpg)
