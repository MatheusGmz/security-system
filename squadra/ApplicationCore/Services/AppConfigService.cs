using ApplicationCore.Entities;
using ApplicationCore.Interfaces.AppConfig;
using System;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class AppConfigService : IAppConfigService
    {
        private readonly IAppConfigRepository _appConfigRepository;

        public AppConfigService(IAppConfigRepository appConfigRepository)
        {
            _appConfigRepository = appConfigRepository;
        }

        public async Task<AppConfig> Provide(int? id, string key, string description, string value)
        {
            if (id.HasValue && id > 0)
            {
                AppConfig appConfig = await _appConfigRepository.GetByIdAsync(id.Value);

                if (appConfig != null)
                {
                    appConfig.Description = description;
                    appConfig.Value = value;
                    appConfig.DataUltimaModificacao = DateTime.Now;
                    return await _appConfigRepository.UpdateAsync(appConfig);
                }
                else
                {
                    throw new InvalidOperationException($"Não foi possível encontrar o AppConfig com o ID: {id}");
                }
            }
            else
            {
                if (string.IsNullOrEmpty(key))
                {
                    throw new ArgumentException("Chave não pode ser nula.");
                }

                AppConfig existingAppConfig = await _appConfigRepository.GetByKeyAsync(key);

                if (existingAppConfig != null)
                {
                    throw new InvalidOperationException($"Já existe um AppConfig com esta chave. {key}");
                }

                AppConfig newAppConfig = new AppConfig
                {
                    Key = key,
                    Description = description,
                    Value = value,
                    DataCriacao = DateTime.Now,
                    DataUltimaModificacao = DateTime.Now
                };

                return await _appConfigRepository.AddAsync(newAppConfig);
            }
        }

        public async Task<double?> GetPeriodInDaysToKeepLogs()
        {
            AppConfig periodToKeepLogsConfig = await _appConfigRepository.GetByKeyAsync("PeriodInDaysToKeepLogs");

            if(periodToKeepLogsConfig != null && !string.IsNullOrEmpty(periodToKeepLogsConfig.Value))
            {
                return Convert.ToDouble(periodToKeepLogsConfig.Value);
            }

            return null;
        }
    }
}
