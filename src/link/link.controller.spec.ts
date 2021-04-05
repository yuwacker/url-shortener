import { HttpStatus, HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { LinkServiceMock } from './link.service.mock';
import { LongLinkDto } from './dto/long-link.dto';
describe('LinkController', () => {
  let linkController: LinkController;
  let linkService: LinkService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [
        {
          provide: LinkService,
          useClass: LinkServiceMock,
        },
      ],
    }).compile();

    linkController = module.get<LinkController>(LinkController);
    linkService = module.get<LinkService>(LinkService);
  });

  describe('Test get long link', () => {
    it('Should redirect to test site', async () => {
      const response = {
        url: 'http://test.ru',
        statusCode: HttpStatus.FOUND,
      };

      const result = await linkController.redirect('abcdeabcde');
      console.log(result);
      expect(result).toEqual(response);
    });

    it('Should return bad short link', async () => {
      const response = new HttpException(
        'Exception: bad short link.',
        HttpStatus.BAD_REQUEST,
      );
      try {
        await linkController.redirect('a');
      } catch (error) {
        expect(error).toEqual(response);
      }
    });

    it('Should return not exist short link', async () => {
      const response = new HttpException(
        'Exception: not exist short link.',
        HttpStatus.NOT_FOUND,
      );
      try {
        await linkController.redirect('aaaaabbbbb');
      } catch (error) {
        expect(error).toEqual(response);
      }
    });
  });

  describe('Test create short link', () => {
    it('Should create short link', async () => {
      const body: LongLinkDto = {
        longLink: 'http://test.ru',
      };

      const response = { statusCode: HttpStatus.OK, shortLink: 'abcdeabcde' };

      const result = await linkController.createShortLink(body);
      expect(result).toEqual(response);
    });

    it('Should return error for invalidated link', async () => {
      const body: LongLinkDto = {
        longLink: 'http:sdsd.ru',
      };

      const response = new HttpException(
        'Exception: invalid link.',
        HttpStatus.NOT_FOUND,
      );
      try {
        await linkController.createShortLink(body);
      } catch (error) {
        console.log(error);
        expect(error).toEqual(response);
      }
    });
  });
});
