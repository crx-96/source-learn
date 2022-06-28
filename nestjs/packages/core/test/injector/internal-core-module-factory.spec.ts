import { ClassProvider, FactoryProvider } from '@nestjs/common';
import { expect } from 'chai';
import { ExternalContextCreator } from '../../helpers/external-context-creator';
import { HttpAdapterHost } from '../../helpers/http-adapter-host';
import { LazyModuleLoader, ModulesContainer } from '../../injector';
import { NestContainer } from '../../injector/container';
import { InternalCoreModule } from '../../injector/internal-core-module';
import { InternalCoreModuleFactory } from '../../injector/internal-core-module-factory';

describe('InternalCoreModuleFactory', () => {
  it('should return the interal core module definition', () => {
    const moduleDefinition = InternalCoreModuleFactory.create(
      new NestContainer(),
      null,
      null,
      null,
    );

    expect(moduleDefinition.module).to.equal(InternalCoreModule);

    const providedInjectables = moduleDefinition.providers.map(
      item => (item as ClassProvider | FactoryProvider).provide,
    );
    expect(providedInjectables).to.deep.equal([
      ExternalContextCreator,
      ModulesContainer,
      HttpAdapterHost,
      HttpAdapterHost.name,
      LazyModuleLoader,
    ]);

    const lazyModuleLoaderProvider = moduleDefinition.providers.find(
      item => (item as FactoryProvider)?.provide === LazyModuleLoader,
    ) as FactoryProvider;
    expect(lazyModuleLoaderProvider.useFactory()).to.be.instanceOf(
      LazyModuleLoader,
    );
  });
});
